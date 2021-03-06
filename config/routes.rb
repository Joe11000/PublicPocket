CorsTest::Application.routes.draw do

  get '/sites/has_url_saved', to: 'sites#has_url_saved'
  # post '/sites/:id/delete' => 'sites#destroy'
  # post '/sites/:id/update' => 'sites#update'
  post '/tags/add',    to: "tags#add"
  post '/tags/remove', to: "tags#remove"

  resources :sites #, only: [:new, :create, :index, :update]

  root 'sites#index'
end
