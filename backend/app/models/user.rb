# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User
  serialize :urls, Array
  has_many :work_experiences
  has_many :daily_reports
  has_many :achivements
  has_many :presentations
  has_many :programming_language_users
  has_many :programming_Languages, through: :programming_language_users

  has_one_attached :image
end

