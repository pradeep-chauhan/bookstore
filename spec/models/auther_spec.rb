require 'rails_helper'

RSpec.describe Auther, :type => :model do
  let(:auther) { create(:auther) }
  subject { build(:auther) }

  describe "Associations" do
    it { should have_many(:books) }
  end

  describe "Validations" do
    it "is valid with valid attributes" do
      expect(subject).to be_valid
    end

    it 'should have a name' do
      expect(subject.name).to be_present
    end
  end
end