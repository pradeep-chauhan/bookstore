auther = Auther.find_or_create_by(name: 'John D.')
Book.find_or_create_by(title: "Shape of mind", isbn: "12345qwerty", quantity: 10, auther: auther)