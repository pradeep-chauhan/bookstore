class Auther < ApplicationRecord
  has_many :books

  validate :name, presence: true, uniqueness: true
end
