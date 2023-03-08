FactoryBot.define do
  factory :book do
    title { Faker::Name.name }
    price { Faker::Number.decimal(l_digits: 2) }
    quantity { Faker::Number.between(from: 1, to: 10) }
    isbn { Faker::Alphanumeric.alphanumeric(number: 10) }
  end
end