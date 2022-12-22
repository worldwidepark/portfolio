class ApplicationController < ActionController::API
        include DeviseTokenAuth::Concerns::SetUserByToken
        include DeviseHackFakeSession
        # # skip_before_action :verify_authenticity_token
        # helper_method :current_user, :user_signed_in?

        # =>  会員登録は下記のbefore_actionだと、できなくなるので、検討要
        # before_action :authenticate_api_v1_user!
        before_action :configure_permitted_parameters, if: :devise_controller?

        # nameを変更可能にする例
        def configure_permitted_parameters
          devise_parameter_sanitizer.permit(:account_update, keys: [:name])
        end
end
