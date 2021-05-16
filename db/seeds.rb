10.times do |n|
  Company.create!(
    name: "company_name_#{n}",
    email: "abcde@_#{n}"
  )
end
