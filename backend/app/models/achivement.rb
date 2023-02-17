class Achivement < ApplicationRecord
  belongs_to :user
  serialize :urls, Array
  has_many :presentations, as: :target, dependent: :destroy
end
