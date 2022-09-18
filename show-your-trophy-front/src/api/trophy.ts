import axios from './'
namespace Trophy {
  // 只有 npsso 的 query 参数
  export interface BasicQuery {
    npsso: string
  }

  // 用户信息
  export interface Profile {
    onlineId: string
    personalDetail: {
      firstName: string
      lastName: string
    }
    aboutMe: string
    avatars: Array<{
      size: string
      url: string
    }>
    languages: Array<string>
    isPlus: boolean
    isOfficiallyVerified: boolean
    isMe: boolean
  }

  // 奖杯 summary
  export interface Summary {
    accountId: string
    trophyLevel: number
    progress: number
    tier: number
    earnedTrophies: {
      bronze: number
      silver: number
      gold: number
      platinum: number
    }
  }

  // 每一个游戏奖杯的数据
  export interface trophyTitle {
    npServiceName: string
    npCommunicationId: string
    trophySetVersion: string
    trophyTitleName: string
    trophyTitleIconUrl: string
    trophyTitlePlatform: string
    hasTrophyGroups: boolean
    definedTrophies: {
      bronze: number
      silver: number
      gold: number
      platinum: number
    }
    progress: number
    earnedTrophies: {
      bronze: number
      silver: number
      gold: number
      platinum: number
    }
    hiddenFlag: boolean
    lastUpdatedDateTime: string
  }

  // 奖杯 summary 的返回数据
  export interface SummaryResData {
    profile: Profile
    summary: Summary
  }

  // 全部游戏和奖杯的返回数据
  export interface AllTrophiesResData {
    trophyTitles: Array<trophyTitle>
    totalItemCount: number
  }
}

/**
 * 获取自己的奖杯 summary
 * @param params
 * @param {string} params.npsso - npsso
 * @returns
 */
export const getSelfSummary = (params: Trophy.BasicQuery) => {
  // 返回的数据格式可以和服务端约定
  return axios.get<Trophy.SummaryResData>('/api/trophy/summary/self', params)
}

/**
 * 获取自己的所有游戏和奖杯
 * @param params
 * @param {string} params.npsso - npsso
 * @returns
 */
export const getSelfAllTrophies = (params: Trophy.BasicQuery) => {
  return axios.get<Trophy.AllTrophiesResData>('/api/trophy/self', params)
}
