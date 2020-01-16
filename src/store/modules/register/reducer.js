import produce from 'immer';

const INITIAL_STATE = {
  name: null,
  rg: null,
  cpf: '',
  birthday: '',
  phone: '',
  education: '',
  desiredVacancy: '',
  reference: null,

  maritalStatus: '',
  children: null,
  dependents: null,
  spouse: '',
  home: '',
  neighborhood: null,
  street: null,
  finances: '',
  debtValue: null,
  transport: '',
  habilitation: '',

  lastJob: null,
  timeJob: null,
  descriptionJob: null,
  typeJob: '',
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@register/MODIFY_NAME': {
        draft.name = action.payload.name;
        break;
      }
      case '@register/MODIFY_RG': {
        draft.rg = action.payload.rg;
        break;
      }
      case '@register/MODIFY_CPF': {
        draft.cpf = action.payload.cpf;
        break;
      }
      case '@register/MODIFY_BIRTHDAY': {
        draft.birthday = action.payload.birthday;
        break;
      }
      case '@register/MODIFY_PHONE': {
        draft.phone = action.payload.phone;
        break;
      }
      case '@register/MODIFY_EDUCATION': {
        draft.education = action.payload.education;
        break;
      }
      case '@register/MODIFY_DESIRED_VACANCY': {
        draft.desiredVacancy = action.payload.desiredVacancy;
        break;
      }
      case '@register/MODIFY_REFERENCE': {
        draft.reference = action.payload.reference;
        break;
      }
      case '@register/MODIFY_MARITAL_STATUS': {
        draft.maritalStatus = action.payload.maritalStatus;
        break;
      }
      case '@register/MODIFY_CHILDREN': {
        draft.children = action.payload.children;
        break;
      }
      case '@register/MODIFY_DEPENDENTS': {
        draft.dependents = action.payload.dependents;
        break;
      }
      case '@register/MODIFY_SPOUSE': {
        draft.spouse = action.payload.spouse;
        break;
      }
      case '@register/MODIFY_HOME': {
        draft.home = action.payload.home;
        break;
      }
      case '@register/MODIFY_NEIGHBORHOOD': {
        draft.neighborhood = action.payload.neighborhood;
        break;
      }
      case '@register/MODIFY_STREET': {
        draft.street = action.payload.street;
        break;
      }
      case '@register/MODIFY_FINANCES': {
        draft.finances = action.payload.finances;
        break;
      }
      case '@register/MODIFY_DEBT_VALUE': {
        draft.debtValue = action.payload.debtValue;
        break;
      }
      case '@register/MODIFY_TRANSPORT': {
        draft.transport = action.payload.transport;
        break;
      }
      case '@register/MODIFY_HABILITATION': {
        draft.habilitation = action.payload.habilitation;
        break;
      }
      case '@register/MODIFY_LAST_JOB': {
        draft.lastJob = action.payload.lastJob;
        break;
      }
      case '@register/MODIFY_TIME_JOB': {
        draft.timeJob = action.payload.timeJob;
        break;
      }
      case '@register/MODIFY_DESCRIPTION_JOB': {
        draft.descriptionJob = action.payload.descriptionJob;
        break;
      }
      case '@register/MODIFY_TYPE_JOB': {
        draft.typeJob = action.payload.typeJob;
        break;
      }
      default:
    }
  });
}
