Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :users do
        resources :work_experiences , only:[:index,:create,:update]
        resources :daily_reports , only:[:index,:create,:update, :delete]

      end
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }
      namespace :auth do
        resources :sessions, only: %i[index]
      end
    end
  end
end
