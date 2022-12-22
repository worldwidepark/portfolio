require "test_helper"

class WorkExperiencesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get work_experiences_index_url
    assert_response :success
  end

  test "should get show" do
    get work_experiences_show_url
    assert_response :success
  end
end
