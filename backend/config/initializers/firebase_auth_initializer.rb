FirebaseIdToken.configure do |config|
  config.redis = Redis.new(
    host: Rails.application.credentials.redis[:host] || "127.0.0.1"
    port: 6379
  )
  config.project_ids = ['craftauth-19733']
end
