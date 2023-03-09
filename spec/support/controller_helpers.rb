module ControllerHelpers
  def json_body
    JSON.parse(response.body)
  end
end

RSpec.configure do |config|
  config.include ControllerHelpers, type: :controller
end

def expect_response_to_deny_access
  expect(response.status).to eq(403)
end

def expect_response_to_allow_access
  expect(response.status).not_to eq(403)
end