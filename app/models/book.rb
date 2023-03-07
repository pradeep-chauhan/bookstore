class Book < ApplicationRecord
  belongs_to :auther

  validate :title, presence: true, uniqueness: true
  validate :isbn, presence: true, uniqueness: true
end
