import axios from "axios";
import { parseAccountData } from "./DataParser";
import { AssignmentPayload } from "./Assignment";

//actual API url
const smartliURL = "https://singaporemath.online:3001/api/v1";

//function for sending newly signed up accounts a verification email
export const sendVerificationEmail = (email: string, uid: string) => {
  return axios
    .post(
      smartliURL + "/users/verify",
      {
        email: email,
        id: uid,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      return response.data;
    });
};

export const login = (email: string, password: string) => {
  return axios
    .post(
      `${smartliURL}/auth/login`,
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log(response);
      return {
        success: true,
        status: response.status,
        account: parseAccountData(response.data),
        data: response.data,
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        success: false,
        status: 500,
        account: undefined,
        data: error,
      };
    });
};

export const CreateAccount = (
  username: string,
  email: string,
  password: string,
  country: string
) => {
  return axios
    .post(
      `${smartliURL}/auth/create`,
      {
        email: email,
        password: password,
        country: country,
        username: username,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      return {
        success: true,
        status: response.status,
        data: response.data,
        message: response.data.message,
      };
    })
    .catch((error) => {
      return {
        success: false,
        status: error.response.status,
        data: error,
        message: error.response.data.message,
      };
    });
};

export const CreateTeacherAccount = (
  email: string,
  password: string,
  username: string,
  displayName: string,
  institutionCode: string
) => {
  return axios
    .post(
      `${smartliURL}/teacher/create`,
      {
        email: email,
        password: password,
        username: username,
        displayName: displayName,
        institutionCode: institutionCode,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      return {
        success: true,
        status: response.status,
        data: response.data,
        message: response.data.message,
      };
    })
    .catch((error) => {
      return {
        success: false,
        status: error.response.status,
        data: error,
        message: error.response.data.message,
      };
    });
};

export const SendPasswordRecoveryEmail = (email: string) => {
  return axios
    .post(
      `${smartliURL}/auth/get-recover`,
      {
        email: email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return {
        status: 500,
        data: error,
      };
    });
};

export const ResetPassword = (
  email: string,
  oldPassword: string,
  newPassword: string
) => {
  return axios
    .post(
      `${smartliURL}/auth/change-password`,
      {
        email: email,
        oldPassword: oldPassword,
        newPassword: newPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      return response.data;
    });
};

export const CreateClassroom = (email: string, id: string, name: string) => {
  return axios
    .post(
      `${smartliURL}/teacher/classroom`,
      {
        email: email,
        id: id,
        name: name,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      return {
        success: true,
        status: response.status,
        data: response.data,
        message: response.data.message,
      };
    })
    .catch((error) => {
      return {
        success: false,
        status: error.response.status,
        data: error,
        message: error.response.data.message,
      };
    });
};

export const GetClassrooms = (email: string, id: string, teacher: boolean) => {
  return axios
    .post(
      `${smartliURL}/teacher/${teacher ? "teacher" : "user"}-classrooms`,
      {
        email: email,
        id: id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      return {
        success: true,
        status: response.status,
        data: response.data,
        message: response.data.message,
      };
    })
    .catch((error) => {
      return {
        success: false,
        status: error.response.status,
        data: error,
        message: error.response.data.message,
      };
    });
};

export const JoinClassroom = (
  email: string,
  id: string,
  displayName: string,
  code: string
) => {
  return axios
    .post(
      `${smartliURL}/teacher/addStudent`,
      {
        email: email,
        id: id,
        displayName: displayName,
        classroomCode: code,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      return {
        success: true,
        status: response.status,
        data: response.data,
        message: response.data.message,
      };
    })
    .catch((error) => {
      return {
        success: false,
        status: error.response.status,
        data: error,
        message: error.response.data.message,
      };
    });
};

export const GetAssignments = (
  email: string,
  id: string,
  classroomCode: string,
  teacher: boolean
) => {
  return axios
    .post(
      `${smartliURL}/teacher/${teacher ? "teacher" : "user"}-assignments`,
      {
        email: email,
        id: id,
        classroomCode: classroomCode,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      return {
        success: true,
        status: response.status,
        data: response.data,
        message: response.data.message,
      };
    })
    .catch((error) => {
      return {
        success: false,
        status: error.response.status,
        data: error,
        message: error.response.data.message,
      };
    });
};

export const deleteAccount = (email: string, password: string) => {
  return axios
    .post(
      `${smartliURL}/users/delete`,
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      return {
        success: true,
        status: response.status,
      };
    })
    .catch((error) => {
      return {
        success: false,
        status: 500,
        data: error,
      };
    });
};

export const submitAssignment = (assignment: AssignmentPayload) => {
  return axios
    .post(`${smartliURL}/teacher/assignment`, assignment, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return {
        success: true,
        status: response.status,
        data: response.data,
        message: response.data.message,
      };
    })
    .catch((error) => {
      return {
        success: false,
        status: 500,
        data: error,
      };
    });
};
