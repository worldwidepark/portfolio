class DailyReport < ApplicationRecord
  belongs_to :user
  has_many :presentations, as: :target, dependent: :destroy
end
