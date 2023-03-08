class RegistrationsController < Devise::RegistrationsController
  respond_to :json
  skip_before_action :authenticate_user!, only: [:create]
  
  def create
      build_resource(sign_up_params)
      resource.save
      render_resource(resource)
  end

  private
  
  def sign_up_params
    params.require(:user).permit(:email, :password)
  end
end