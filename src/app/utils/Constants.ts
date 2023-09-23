import { HttpHeaders } from "@angular/common/http";

export class Constants {

  static readonly apiUrl = 'http://localhost:8080/api';

  static UserJwtToken='';

  static readonly AdminJwtToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtb2hhIiwiaWF0IjoxNjk1NDYzNjAxLCJleHAiOjE2OTU0ODUyMDF9.-2LQYKSBXmHfuwujR64jJa4n_0EYa1mVWyJM_38y-qc';

  static readonly InstructorJwtToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2hhIiwiaWF0IjoxNjk1Mjk2MDYzLCJleHAiOjE2OTUzMTc2NjN9.Lb6TyvFZHaeKsIaErlzMVsXptNQXHdDFQSrprivVOBM';

  static readonly StudentJwtToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJub2hhIiwiaWF0IjoxNjk1Mzg1OTI4LCJleHAiOjE2OTU0MDc1Mjh9.Fcad1JdKRCWwUP_RFpRTHv5bjH5IIHcZRLYw4hXCEPE';

  static readonly coursePageSize=10;

  static options = {
    headers: new HttpHeaders().append(
      'Authorization',
      `Bearer ${this.UserJwtToken}`
    ),
  };

  static setOptions(token:string){
    const options = {
      headers: new HttpHeaders().append(
        'Authorization',
        `Bearer ${this.UserJwtToken}`
      ),
    };
    this.options = options;
  }


}