class Book < ApplicationRecord
  belongs_to :auther

  validates :title, presence: true, uniqueness: true
  validates :isbn, presence: true, uniqueness: true
end
