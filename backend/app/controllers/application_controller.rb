class ApplicationController < ActionController::API
        include DeviseTokenAuth::Concerns::SetUserByToken
        include DeviseHackFakeSession
        # # skip_before_action :verify_authenticity_token
        # helper_method :current_user, :user_signed_in?
end
