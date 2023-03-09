require 'rails_helper'

RSpec.describe AuthersController, :type => :controller do
  let(:auther) { create(:auther) }
  let(:user) { create(:user) }

  describe 'logged in as user' do
    before do
      sign_in user
    end

    it 'GET #index json' do
      get :index, format: :json
      expect((JSON.parse(response.body)).count).to eq(1)
    end
  end
end