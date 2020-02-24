export function modifyUuid(uuid) {
  return {
    type: '@register/MODIFY_UUID',
    payload: { uuid },
  };
}
export function modifyName(name) {
  return {
    type: '@register/MODIFY_NAME',
    payload: { name },
  };
}

export function modifyRG(rg) {
  return {
    type: '@register/MODIFY_RG',
    payload: { rg },
  };
}

export function modifyCPF(cpf) {
  return {
    type: '@register/MODIFY_CPF',
    payload: { cpf },
  };
}

export function modifyVoterTitle(voterTitle) {
  return {
    type: '@register/MODIFY_VOTER_TITLE',
    payload: { voterTitle },
  };
}

export function modifyEmail(email) {
  return {
    type: '@register/MODIFY_EMAIL',
    payload: { email },
  };
}

export function modifyBirthday(birthday) {
  return {
    type: '@register/MODIFY_BIRTHDAY',
    payload: { birthday },
  };
}

export function modifyPhone(phone) {
  return {
    type: '@register/MODIFY_PHONE',
    payload: { phone },
  };
}

export function modifyEducation(education) {
  return {
    type: '@register/MODIFY_EDUCATION',
    payload: { education },
  };
}

export function modifyHability(hability) {
  return {
    type: '@register/MODIFY_HABILITY',
    payload: { hability },
  };
}

export function modifyReference(reference) {
  return {
    type: '@register/MODIFY_REFERENCE',
    payload: { reference },
  };
}

export function modifyMaritalStatus(maritalStatus) {
  return {
    type: '@register/MODIFY_MARITAL_STATUS',
    payload: { maritalStatus },
  };
}

export function modifyDependents(dependents) {
  return {
    type: '@register/MODIFY_DEPENDENTS',
    payload: { dependents },
  };
}

export function modifyHome(home) {
  return {
    type: '@register/MODIFY_HOME',
    payload: { home },
  };
}

export function modifyPostalCode(cep) {
  return {
    type: '@register/MODIFY_POSTAL_CODE',
    payload: { cep },
  };
}

export function modifyNeighborhood(neighborhood) {
  return {
    type: '@register/MODIFY_NEIGHBORHOOD',
    payload: { neighborhood },
  };
}

export function modifyAddress(address) {
  return {
    type: '@register/MODIFY_ADDRESS',
    payload: { address },
  };
}

export function modifyTransport(transport) {
  return {
    type: '@register/MODIFY_TRANSPORT',
    payload: { transport },
  };
}

export function modifyHabilitation(habilitation) {
  return {
    type: '@register/MODIFY_HABILITATION',
    payload: { habilitation },
  };
}

export function modifyLastJob(lastJob) {
  return {
    type: '@register/MODIFY_LAST_JOB',
    payload: { lastJob },
  };
}

export function modifyTimeJob(timeJob) {
  return {
    type: '@register/MODIFY_TIME_JOB',
    payload: { timeJob },
  };
}

export function modifyDescriptionJob(descriptionJob) {
  return {
    type: '@register/MODIFY_DESCRIPTION_JOB',
    payload: { descriptionJob },
  };
}

export function modifyTypeJob(typeJob) {
  return {
    type: '@register/MODIFY_TYPE_JOB',
    payload: { typeJob },
  };
}

export function modifyBank(bank) {
  return {
    type: '@register/MODIFY_BANK',
    payload: { bank },
  };
}

export function modifyAccountType(accountType) {
  return {
    type: '@register/MODIFY_ACCOUNT_TYPE',
    payload: { accountType },
  };
}

export function modifyAgency(agency) {
  return {
    type: '@register/MODIFY_AGENCY',
    payload: { agency },
  };
}

export function modifyOperation(operation) {
  return {
    type: '@register/MODIFY_OPERATION',
    payload: { operation },
  };
}

export function modifyAccountNumber(accountNumber) {
  return {
    type: '@register/MODIFY_ACCOUNT_NUMBER',
    payload: { accountNumber },
  };
}

export function modifyHolder(holder) {
  return {
    type: '@register/MODIFY_HOLDER',
    payload: { holder },
  };
}

export function modifyHolderCPF(holderCPF) {
  return {
    type: '@register/MODIFY_HOLDER_CPF',
    payload: { holderCPF },
  };
}

export function modifyShirt(shirt) {
  return {
    type: '@register/MODIFY_SHIRT',
    payload: { shirt },
  };
}

export function modifyPants(pants) {
  return {
    type: '@register/MODIFY_PANTS',
    payload: { pants },
  };
}

export function modifyShoes(shoes) {
  return {
    type: '@register/MODIFY_SHOES',
    payload: { shoes },
  };
}

export function modifyPhoto(photo) {
  return {
    type: '@register/MODIFY_PHOTO',
    payload: { photo },
  };
}

export function modifyDocFront(docFront) {
  return {
    type: '@register/MODIFY_DOCFRONT',
    payload: { docFront },
  };
}

export function modifyDocBack(docBack) {
  return {
    type: '@register/MODIFY_DOCBACK',
    payload: { docBack },
  };
}

export function modifyImgVoterTitle(imgVoterTitle) {
  return {
    type: '@register/MODIFY_IMG_VOTER_TITLE',
    payload: { imgVoterTitle },
  };
}

export function modifyImgAddress(imgAddress) {
  return {
    type: '@register/MODIFY_IMG_ADDRESS',
    payload: { imgAddress },
  };
}

export function modifyImgCpf(imgCpf) {
  return {
    type: '@register/MODIFY_IMG_CPF',
    payload: { imgCpf },
  };
}

export function modifyContractType(contractType) {
  return {
    type: '@register/MODIFY_CONTRACT_TYPE',
    payload: { contractType },
  };
}

export function modifyJobRules(jobRules) {
  return {
    type: '@register/MODIFY_JOB_RULES',
    payload: { jobRules },
  };
}

export function modifyPayment(payment) {
  return {
    type: '@register/MODIFY_PAYMENT',
    payload: { payment },
  };
}

export function modifyPaymentValue(paymentValue) {
  return {
    type: '@register/MODIFY_PAYMENT_VALUE',
    payload: { paymentValue },
  };
}

export function modifyBonus(bonus) {
  return {
    type: '@register/MODIFY_BONUS',
    payload: { bonus },
  };
}

export function modifyCotractDate(cotractDate) {
  return {
    type: '@register/MODIFY_CONTRACT_DATA',
    payload: { cotractDate },
  };
}

export function modifyStatusAvanci(statusAvanci) {
  return {
    type: '@register/MODIFY_STATUS_AVANCI',
    payload: { statusAvanci },
  };
}

export function clearRegister() {
  return {
    type: '@register/CLEAR_REGISTER',
  };
}
