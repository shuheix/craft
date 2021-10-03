FactoryBot.define do
  factory :article do
    title { 'testのタイトル' }
    text { 'textの内容' }
    user
  end
end
