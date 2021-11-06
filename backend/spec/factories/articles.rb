FactoryBot.define do
  factory :article do
    title { 'testのタイトル' }
    text { 'textの内容' }
    association :user
  end
end
