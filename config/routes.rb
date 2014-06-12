CorsTest::Application.routes.draw do

  get '/sites/has_url_saved', to: 'sites#has_url_saved'
  post 'sites/:id/delete' => 'sites#destroy'
  post 'sites/:id/update' => 'sites#update'
  resources :sites, only: [:create, :index]

  root 'sites#index'
end
