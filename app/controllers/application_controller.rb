class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  before_action :authenticate_user!
  
  def render_resource(resource)
    if resource.errors.empty?
        render json: resource
    else
        validation_error(resource)
    end
  end

  def validation_error(resource)
    render json: {
      errors: resource.errors
    }, status: :bad_request
  end
end
