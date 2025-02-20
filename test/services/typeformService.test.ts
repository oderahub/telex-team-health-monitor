import { createForm, getFormResponses, setCurrentFormId } from '../../src/services/typeformService'
import fetch from 'node-fetch'

jest.mock('node-fetch')
const mockedFetch = fetch as jest.MockedFunction<typeof fetch>

describe('typeformService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Set a test form ID at the start of each test
    setCurrentFormId('testFormId')
  })

  describe('createForm', () => {
    it('should create a form and return its data', async () => {
      const mockResponse = {
        json: jest.fn().mockResolvedValue({ id: 'testFormId', _links: { display: 'test-url' } }),
        ok: true
      }
      mockedFetch.mockResolvedValue(mockResponse as any)

      const result = await createForm()

      expect(mockedFetch).toHaveBeenCalledWith(
        'https://api.typeform.com/forms',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            Authorization: expect.stringContaining('Bearer'),
            'Content-Type': 'application/json'
          })
        })
      )
      expect(result.id).toBe('testFormId')
    })

    it('should handle errors when creating a form', async () => {
      mockedFetch.mockRejectedValue(new Error('API Error'))

      await expect(createForm()).rejects.toThrow('API Error')
    })
  })

  describe('getFormResponses', () => {
    it('should fetch form responses', async () => {
      const mockResponse = {
        json: jest.fn().mockResolvedValue({ items: [] }),
        ok: true
      }
      mockedFetch.mockResolvedValue(mockResponse as any)

      const result = await getFormResponses()

      expect(mockedFetch).toHaveBeenCalledWith(
        'https://api.typeform.com/forms/testFormId/responses',
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: expect.stringContaining('Bearer')
          })
        })
      )
      expect(result.items).toEqual([])
    })

    it('should handle errors when fetching responses', async () => {
      mockedFetch.mockRejectedValue(new Error('Fetch Error'))

      await expect(getFormResponses()).rejects.toThrow('Fetch Error')
    })
  })
})
