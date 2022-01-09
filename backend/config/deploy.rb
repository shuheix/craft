# config valid for current version and patch releases of Capistrano
lock "~> 3.16.0"

set :repo_tree, 'backend' # デプロイ対象のディレクトリパス
set :repo_url, "git@github.com:shuheix/craft.git"

append :linked_files, "config/master.key"
append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "vendor/bundle", "public/system", "public/uploads"

# SSH接続設定
set :ssh_options, {
  auth_methods: ['publickey'],
  keys: ['~/.ssh/rails-key.pem']
}
# 保存しておく世代の設定
set :keep_releases, 5

# rbenvの設定
set :rbenv_ruby, File.read('.ruby-version').strip
set :rbenv_type, :user

# set :bundle_gemfile, "backend/Gemfile"
set :branch, 'main'

# Unicornのプロセスの指定
set :unicorn_pid, -> { "#{shared_path}/tmp/pids/unicorn.pid" }

# Unicornの設定ファイルの指定
set :unicorn_config_path, -> { "#{current_path}/config/unicorn.rb" }

# Unicornを再起動するための記述
after 'deploy:publishing', 'deploy:restart'

namespace :deploy do
  desc "Run rake yarn install"
  task :yarn_install do
    on roles(:web) do
      within release_path do
        execute("cd #{release_path} && yarn install --silent --no-progress --no-audit --no-optional")
      end
    end
  end

  task :restart do
    invoke 'unicorn:restart'
  end
end
before "deploy:assets:precompile", "deploy:yarn_install"
