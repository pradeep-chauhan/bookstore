class AuthersController < ApplicationController
  before_action :exists, only: %i[update show destroy]

  def index
    render json: { authers: Auther.all }, status: :ok
  end

  def show
    render json: { auther: @auther }, status: :ok
  end

  def create
    @auther = Auther.new(auther_params)
    @auther.save!
    render json: { auther: @auther }, status: :ok
  rescue => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  def update
    @auther.update!(auther_params)
    render json: { auther: @auther }, status: :ok
  rescue => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  def destroy
    @auther.destroy!
    render json: {}, status: :ok
  end

  private

  def exists
    @auther = Auther.find_by_id(params[:id])
    render json: { error: 'Auther is not found' }, status: :not_found unless @auther.present?
  end

  def auther_params
    params.require(:auther).permit(:name)
  end
end
