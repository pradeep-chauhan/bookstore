Rails.application.routes.draw do
  root 'home#index'
  # get '*path', to: 'home#index', via: :all 
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
