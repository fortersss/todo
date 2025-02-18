class MembersController < ApplicationController
  before_action :authenticate_user!

  def show
    user = get_user_from_token
    render json: {
      message: "If you see this, you are authenticated",
      user: user
    }
  end

  private

  def get_user_from_token
    if Rails.env.production?
      jwt_payload = JWT.decode(request.headers['Authorization'].split(' ')[1], Rails.application.credentials[:devise_jwt_secret_key]).first
    else
      jwt_payload = JWT.decode(request.headers['Authorization'].split(' ')[1], ENV['JWT_SECRET_KEY']).first
    end
    user_id = jwt_payload["sub"]
    User.find(user_id.to_s)
  end
end