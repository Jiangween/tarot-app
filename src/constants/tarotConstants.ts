export const SPREAD_TYPES = {
    '单牌': 'SINGLE',
    '三牌阵': 'THREE_CARDS',
    '凯尔特十字阵': 'CELTIC_CROSS',
    '关系牌阵': 'RELATIONSHIP',
    'SINGLE': 'SINGLE',
    'THREE_CARDS': 'THREE_CARDS',
    'CELTIC_CROSS': 'CELTIC_CROSS',
    'RELATIONSHIP': 'RELATIONSHIP'
  } as const;
    
  export const POSITION_MEANINGS = {
    SINGLE: ['当前情况的核心'],
    THREE_CARDS: ['过去', '现在', '未来'],
    CELTIC_CROSS: [
      '当前处境',
      '当前的挑战',
      '过去基础',
      '即将过去',
      '期望目标',
      '即将到来',
      '自我认知',
      '环境影响',
      '希望恐惧',
      '最终结果'
    ],
    RELATIONSHIP: ['你的位置', '对方的位置']  // 添加关系牌阵的位置定义
  } as const;
  
  