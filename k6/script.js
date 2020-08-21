import http from 'k6/http';
import { check } from 'k6';
import { Rate } from 'k6/metrics';

export let errorRate = new Rate('errors');

export default function() {
  var url = 'http://a:8082/signer/v1/signatures';

  var payload = JSON.stringify({
    "signature_algorithm" : "SHA256withRSA",
    "data" : "VGhpcyBpcyB0aGUgZGF0YSB0byBiZSBzaWduZWQK",
    "private_key" : "MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDkPfQ66VDCWRBVCVvGm62uncUOpDruutRA1hVPHq/EKDuPFNHlrmsecT2w0f8xdYdfvxsmIfMNc1vVmV57qjL5m6oNkUzPvJk9QVmlTc2Dejj5G/2QDOMJs1xw1uPxfHDLRioXIO8SP3I994DrcwvdhN32XNpbbQiuX6qULqYYYEvIp+8P49xvv7KbzZNXVf0LXH7bQF/UlrP9u7edbjaqJNx3stG6xM/sg2rJflSInpOivanDRaKfTWiZDHKLEavOcj2aFA8EzgV83XD9uM33nTf04etwf6mi8Z+y+WNZmfonkiG+sQg0ZyBfwT0iIdXV4MhH/hovIM2VV/DV4NgbAgMBAAECggEBAOEX/Jpw6VWSMpo6zYkUlXhlXicvbnNsS9HZkFBkSiHhL8PPW6XxmvD960JMCCpF54lU1riHuMVmJIaGZ/j8BKPIkjApQSCKtnID1h5BmdH1ouSCZ1I+c1Zozlz2gPzypebDPtVqhHxxmABm7HzIDEaeN601K6AI6wvVi0vyqZnU2Xk9RT/6mQt8J4ijJ8rR/oBf7TGlxz6e74pPtX5ejwB8rpYtDOtWrKMhT4TSDWHBfSGhr/ZU/+tGZh+TOAC2mOYwajUf62oJ2FJdY8dHieuGtTft7dd1ZC/Y2HEK7YA4i6OnM8R/ONl9vRjilFpwfsVp/4Mm4w5YkvaT+eDEWXkCgYEA9DaoHIGdz6XB+OSDFTj1hpyBKKVb0G2B0wkYLs7hvHH/cpgtnCJjG2y5sCK59qVorD+3B1S+aJM7J2lcOMTIojjVqspyEvxhmjWOJ8Yj1Fa9hjKV6vbRPD2XD/Aslphr/2b8LBv5zl+CllKHcgmZMYpRHRBXD6743oBCewyan2UCgYEA70H2xB8cFsEPBLH6DvhXg4u9y2/Q5yxHR5NeLVrjc6LhNz4SFWl4pG5OHPdtT5wJ/JaxDvtnLcBtHER9QWhG1jWbnw5I2he/NfQAuPQLbkM3tXjBcvsyCPnmgRkxKjvDU7EbhVThsEPvo53G//DrDjlMe0x6GMI3UgwDhxOE4X8CgYEAjklqGXHLqLhDE+jQFwVgyFVXS39Mx1uGUJbz6BHRpCInW3Ue3eGLLOdkKSOShgpJulJFKZhOeE+QH55bhRfibeH/W8soO7eghmC9up7PMWB4fD/s6UF1F0wrP7YHxJZ6FgzC0FBcc8liJINhNygwgZS9PdnPX+vqRHkmQttNG6ECgYBb+9RPWlaGOPr5JyOoFbovjM4PJJIADnno/rM6ZLMFhh1oC6kQKliDfxTw9f9EmA0O2zB/PhBQ+qX4NCyjtN9nA30tDWTc1DxjFcghU1IBtj34utBE0GZQJSOFhpXsUsWpq3GVNSj/h17eXI5hX9I+ybCpxqE6W5DBLnU8vThdKQKBgQCB7/HU9fv2svMNKtfzz8fXY3wQGnDbx8NxFzGxYG/R9343L/os2uO35BnFnfS63PpbOZLfUpUQupLTAP4D0rarOMpABIE2j2sdq2xyjghVdGrxqlwHCwoAuHfn+MfOXcVFs/KYw6V45tJP1Hx5dQ6PrnPffmsfDOYaLapUNs+qag=="
    });

  var params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJteWNsaWVudCIsImlzcyI6Im15YXMiLCJpYXQiOjE1OTY4MDc2ODh9.KM6-HRgC7W364HPteIerw9N1Nc8hbSyThS6NMXXcMzyQcQYmJlO8TpSg0G0tsHpAd_3J9avlJLskaMSdi2CAqBunq3oumDUXLWEZ1iewg5fLzOGqdLE6PazoVwRQCuTuzkRnXeLKIO0SmHV4UfdLCJu_ejp0Cx7G5QSfkV-TgbawYIJCHWlv3xxoNN9__gkF5yZ4Dd9b1rwPp-KGIfU4JOj6QiVmkpGBJnMvZiEZZS2Sb2yf2KnsHDScd3lGAj6xeMF8HCBIQn1JD7OwQL1HB8GbPob33DuGh5kU1rqGIR9hcdUDMe29-DjpBEME_vSC7-iWm4W87JEoGa_onrD_aQ'
    },
  };
  
  check(http.post(url, payload, params), {
    'status is 200': r => r.status == 200
  }) || errorRate.add(1);
}