require 'rails_helper'

RSpec.describe User, :type => :model do
  let(:user) { create(:user) }
  subject { build(:user) }

  describe "Validations" do
    it "is valid with valid attributes" do
      expect(subject).to be_valid
    end
  end
end