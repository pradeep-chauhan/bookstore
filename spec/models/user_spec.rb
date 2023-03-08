require 'rails_helper'

RSpec.describe User, :type => :model do
  let(:user) { create(:user) }
  subject { build(:user) }

  describe "Validations" do
    it "is valid with valid attributes" do
      expect(subject).to be_valid
    end

    it 'should have a name' do
      expect(subject.name).to be_present
    end

    it 'should have a email' do
      expect(subject.email).to be_present
    end

    it 'should have a password' do
      expect(subject.password).to be_present
    end
  end
end