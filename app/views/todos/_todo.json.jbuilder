json.extract! todo, :id, :text, :complete, :created_at, :updated_at
json.url todo_url(todo, format: :json)
