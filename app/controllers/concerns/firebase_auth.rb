class FirebaseAuth::TokenValidator
  # firebase documents
  # https://firebase.google.com/docs/auth/admin/verify-id-tokens?hl=ja#web
  ALG = 'RS256'
  KID = 'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com'

  PROJECT_ID = 'craftauth-19733'
  ISSUER_URI_BASE = 'https://securetoken.google.com/'

  def initialize(token)
    @token = token
  end

  def validate!
    options = {
      algorithm: ALG,
      iss: ISSUER_URI_BASE + PROJECT_ID ,
      verify_iss: true,
      aud: PROJECT_ID
      verify_aud: true,
      verify_iat: true,
    }

    payload, _ = JWT.decode(@token, nil, true, options)
      cert = fetch_certificates[header['kid']]
      if cert.present?
        OpenSSL::x509::Certificate.new(cert).public_key
      else
        nil
      end
  end

  raise InvalidTokenError.new('Invalid auth_time') unless Time.zone.at(payload['auth_time']).past?
  raise InvalidTokenError.new('Invalid sub') if payload['sub'].empty?

  rescue JWT::DecodeError => e
    Rails.logger.error e.message
    Rails.logger.error e.backtrace.join("\n")
  end

  private

  def fetch_certificates
    cached = Rails.cache.read(CERTS_CACHE_KEY)
    return cached if cached.present?

    res = Net::HTTP.get_response(URI(CERTS_URI))
    raise 'Fetch certificates error' unless res.is_a?(Net::HTTPSuccess)

    body = JSON.parse(res.body)
    expires_at = Time.zone.parse(res.header['expires'])
    Rails.cache.write(CERTS_CACHE_KEY, body, expires_in: expires_at - Time.current)

    body
  end
end
