json.array!(@sits) do |sit|
  json.extract! sit, :id, :name, :title, :age
  json.url sit_url(sit, format: :json)
end
