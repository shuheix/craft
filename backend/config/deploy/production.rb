server "54.150.206.249", user: "ec2-user", roles: %w{app db web}

set :ssh_options, {
  keys: %w(~/.ssh/rails-key.pem),
  forward_agent: true,
  auth_methods: %w(publickey),
}
