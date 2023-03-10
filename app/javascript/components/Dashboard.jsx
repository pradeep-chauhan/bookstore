import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DataTable from "./dataTable";
import AddIcon from "@mui/icons-material/Add";
import CreateEditForm from "./CreateEditForm";
import axiosInstance from "./axios";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { SnackbarProvider, useSnackbar } from 'notistack';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const initialValue = {
  title: "",
  isbn: "",
  quantity: "",
  price: "",
  auther_id: "2",
};

const Dashboard = () => {
  const theme = useTheme();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [formOpen, setFormOpen] = React.useState(false);
  const [bookData, setBookData] = React.useState([]);
  const [data, setData] = React.useState(initialValue || {});
  const [formType, setFormType] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setFormOpen(true);
    setData(false);
    setFormType(false);
  };

  const handleClose = () => {
    setFormOpen(false);
  };

  const handleSave = async () => {
    let url,
      method,
      actionUrl = "/books";

    if (formType) {
      method = "put";
      url = `${actionUrl}/${data?.id}`;
    } else {
      method = "post";
      url = `${actionUrl}`;
    }

    await axiosInstance
      .request({
        method: method,
        url: url,
        data: {
          book: {
            ...data,
          },
        },
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          let out = {};
          const item = response?.data?.book;
          out = {
            id: item?.id,
            title: item?.title,
            isbn: item?.isbn,
            price: item?.price,
            quantity: item?.quantity,
          };
          if (formType) {
            const newData = [...bookData];
            const index = newData.findIndex((e) => e.id === out?.id);
            newData[index] = out;
            setBookData(newData);
          } else {
            const combind = [out, ...bookData];
            setBookData(combind);
          }

          handleClose();
        }
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  const handleDelete = async (currentRowId) => {
    await axiosInstance
      .delete(`/books/${currentRowId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const newData = [...bookData];
          const index = newData.findIndex((e) => e.id === currentRowId);
          newData.splice(index, 1);
          enqueueSnackbar("Delete Successfully", {
            variant: "success",
          })
          setBookData(newData);
        }
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  const handleChange = (e) => {
    if (!e) return;
    let chng;
    chng = {
      [e.target.id || e.target.name]: e.target.value,
    };
    setData({ ...data, ...chng });
  };

  const getBooksData = async () => {
    await axiosInstance
      .get("/books")
      .then((response) => {
        if (response.status === 200) {
          let out = [];
          response?.data?.books.map((item, i) => {
            out.push({
              id: item?.id,
              title: item?.title,
              isbn: item?.isbn,
              price: item?.price,
              quantity: item?.quantity,
            });
          });
          setBookData(out);
        }
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  React.useEffect(() => {
    getBooksData();
  }, []);

  const handleLogout = async () => {
    await axiosInstance
      .delete(`/logout`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          enqueueSnackbar("Logout Successfully", {
            variant: "success",
          })
          localStorage.removeItem("token")
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error, "error");
      });
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <SnackbarProvider />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{display: 'flex', justifyContent: "space-between"}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Book Store
          </Typography>
          <IconButton onClick={() => handleLogout()}>
            <LogoutIcon sx={{color: "white"}}/>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Books"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <MenuBookIcon />
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Box sx={{ textAlign: "right", marginBottom: "20px" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <AddIcon />
          </IconButton>
        </Box>

        <DataTable
          bookData={bookData}
          setFormOpen={setFormOpen}
          setFormType={setFormType}
          setData={setData}
          handleDelete={handleDelete}
        />

        {formOpen && (
          <CreateEditForm
            handleClose={handleClose}
            handleSave={handleSave}
            handleChange={handleChange}
            editData={data}
            formType={formType}
          />
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
