class SessionsController < Devise::SessionsController
  respond_to :json
  skip_before_action :authenticate_user!, only: [:render_resource, :validation_error]
  
  private

  def respond_with(resource, _opts = {})
    render json: { user: resource }, status: :ok
  end

  def respond_to_on_destroy
    current_user ? log_out_success : log_out_failure
  end

  def log_out_success
    render json: {
      message: "logged out successfully"
    }, status: :ok
  end

  def log_out_failure
    render json: {
      message: "Couldn't find an active session."
    }, status: :unauthorized
  end
end
