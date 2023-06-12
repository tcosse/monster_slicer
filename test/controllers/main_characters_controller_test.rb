require "test_helper"

class MainCharacterControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get main_character_create_url
    assert_response :success
  end
end
