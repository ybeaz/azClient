


export interface Img {
  readonly src: string,
  readonly alt?: string
}

export interface Payload {
  readonly optGet?: string,
  readonly optPost?: string,
  readonly utAnltSid?: string,
  readonly initData?: {}[],
  readonly eventData?: {}[] | [],
  readonly topics?: string[] | [],
  readonly target?: any[] | [],
  readonly role?: string[],
  readonly msg?: string[],
  readonly actionLog?: string[],
  readonly inception?: string[],
  readonly searchPhrase?: string[],
  readonly searchCategory?: string[],
  readonly searchMedia?: string[],
  readonly catalogCategory?: string[],
  readonly userPrifile?: string[],
  readonly email?: string[],
  readonly width?: number,
  readonly height?: number,
  readonly search?: string,
  readonly pathname?: string,
  readonly hostname?: string,
  readonly href?: string,
}

export interface UserFootprint {
  readonly utAnltSid?: string,
  readonly initData?: {}[] | [],
  readonly eventData?: any[] | [],
  readonly topics?: string[] | [],
  readonly target?: any[] | [],
}

export interface Store {
  actionLog: object[];
  userFootprint: UserFootprint;
}

export interface ModeProdDev {
  readonly checkEnterEmail?: boolean,
  readonly checkSelectRole?: boolean,
}

export interface Action {
// tslint:disable-next-line: no-reserved-keywords
  readonly type: string,
  readonly data?: any,
  readonly payload?: any,
  readonly item?: any,
  readonly lang?: string,
  readonly treeData?: any,
  readonly modalNext?: string,
  readonly capture?: string,
  readonly eid?: string,
  readonly general?: boolean,
  readonly scrollInterval?: number,
  readonly scrollPeriodEnd?: number,
  readonly getActionAsync?: Function,
}

export interface ModalWindowStateItem {
  component?: string,
  display?: boolean,
}

export type ModalWindowState = [ModalWindowStateItem]
