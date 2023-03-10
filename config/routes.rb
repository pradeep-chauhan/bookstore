Rails.application.routes.draw do
  root 'home#index'
  get '/dashboard', to: 'home#index'
  resources :users, only: %i[index show]

    devise_for :users,
    path: '',
    path_names: {
        sign_in: 'login',
        sign_out: 'logout',
        registration: 'signup'
    },
    controllers: {
        sessions: 'sessions',
        registrations: 'registrations'
    }
  
  resources :authers
  resources :books
end
