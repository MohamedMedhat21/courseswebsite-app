import { HttpHeaders } from "@angular/common/http";

export class Constants {

  static readonly apiUrl = 'http://localhost:8080/api';

  static readonly AdminJwtToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtb2hhIiwiaWF0IjoxNjk1MzgyNTEyLCJleHAiOjE2OTU0MDQxMTJ9.tC2vscLiGbGqQp9i2eCNo-B_XwjPOKG9Qe6aVht-YrM';

  static readonly InstructorJwtToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2hhIiwiaWF0IjoxNjk1Mjk2MDYzLCJleHAiOjE2OTUzMTc2NjN9.Lb6TyvFZHaeKsIaErlzMVsXptNQXHdDFQSrprivVOBM';

  static readonly coursePageSize=10;

  static readonly options = {
    headers: new HttpHeaders().append(
      'Authorization',
      `Bearer ${this.AdminJwtToken}`
    ),
  };

}