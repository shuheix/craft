FirebaseIdToken.configure do |config|
  if Rails.env.production?
    config.redis = Redis.new(
      host: Rails.application.credentials.redis[:host],
      port: "6379"
    )
  else
    config.redis = Redis.new
  end
  config.project_ids = ['craftauth-19733']
end
