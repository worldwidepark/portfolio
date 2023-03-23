class Api::V1::ProgrammingLanguagesController < ApplicationController
  before_action :user_finder

  def index
    programming_languages_data = @user.programming_languages
    render json: programming_languages_data
  end

  def create
    result = ProgrammingLanguage.where("name LIKE?","#{programming_language_params[:name]}")
    if result.present?
      @user.programming_language_users.find_or_create_by(programming_language_id: result.first.id)
    else
      @user.programming_languages.find_or_create_by(name:"#{programming_language_params[:name]}")
    end
    render json: @user.programming_languages.find_by(name:"#{programming_language_params[:name]}")
  end

  def destroy
    programming_language = @user.programming_language_users.find_by(programming_language_id: params[:id])
    if programming_language.delete
      render json: {message: "削除"}
    end
  end

  def search
    results = ProgrammingLanguage.where("name LIKE?","%#{programming_language_params[:name]}%")
    if results
      render json: results
    end
  end

  def programming_language_params
    params.require(:programming_language).permit(:name)
  end

  def user_finder
    @user = User.find(params[:user_id])
  end

end
