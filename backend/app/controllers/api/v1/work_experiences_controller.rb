class Api::V1::WorkExperiencesController < ApplicationController
  before_action :user_finder

  def index
    work_experiences = @user.work_experiences
    render json: work_experiences
  end

  def create
    work_experience = @user.work_experiences.new(work_experience_params)
    if work_experience.save
      render json: work_experience
    else
      render json: work_experience.errors, status: 422
    end
  end

  def update
    work_experience = @user.work_experiences.find_by(work_experience_params[:id])
    if work_experience.update(work_experience_params)
      render json: work_experiences
    else
      render json: {alret:"what are you doing" }
    end
  end

  private
  def work_experience_params
    params.require(:work_experience).permit(:id,:job_title, :duties, :dates_of_employment,:achievements)
  end

  def user_finder
    @user = user = User.find(params[:user_id])
  end

end
