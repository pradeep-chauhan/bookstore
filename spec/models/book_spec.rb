require 'rails_helper'

RSpec.describe Book, :type => :model do
  let(:auther) { create(:auther) }
  subject { build(:book, auther: auther) }

  describe "Associations" do
    it { should belong_to(:auther).without_validating_presence }
  end

  describe "Validations" do
    it { should validate_presence_of(:auther) }

    it "is valid with valid attributes" do
      expect(subject).to be_valid
    end
  end
end