FactoryBot.define do
  factory :article do
    title { 'testのタイトル' }
    text { 'textの内容' }
    uid { 'zXtNnIkUnZNUE2xYkq1Cp8EyB6y1' }
    is_answerd { false }
    association :user
  end
end
