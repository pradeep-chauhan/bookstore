class UsersController < ApplicationController
  before_action :find_user, only: %i[show]

  def index
    render json: { users: User.all }, status: :ok
  end

  def show
    render json: { user: @user }, status: :ok
  end

  private

  def find_user
      @user = User.find_by_id(params[:id])
      render json: { error: 'user is not found' }, status: :not_found unless @user.present?
  end
end
