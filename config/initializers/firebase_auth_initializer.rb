FirebaseIdToken.configure do |config|
  config.redis = Redis.new
  config.project_ids = ['craftauth-19733']
end
