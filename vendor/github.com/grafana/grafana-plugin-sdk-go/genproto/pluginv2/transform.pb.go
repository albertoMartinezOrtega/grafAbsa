// Code generated by protoc-gen-go. DO NOT EDIT.
// source: transform.proto

package pluginv2

import (
	context "context"
	fmt "fmt"
	proto "github.com/golang/protobuf/proto"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
	math "math"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.ProtoPackageIsVersion3 // please upgrade the proto package

type TransformQuery struct {
	RefId                string   `protobuf:"bytes,1,opt,name=refId,proto3" json:"refId,omitempty"`
	MaxDataPoints        int64    `protobuf:"varint,2,opt,name=maxDataPoints,proto3" json:"maxDataPoints,omitempty"`
	IntervalMs           int64    `protobuf:"varint,3,opt,name=intervalMs,proto3" json:"intervalMs,omitempty"`
	ModelJson            string   `protobuf:"bytes,4,opt,name=modelJson,proto3" json:"modelJson,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *TransformQuery) Reset()         { *m = TransformQuery{} }
func (m *TransformQuery) String() string { return proto.CompactTextString(m) }
func (*TransformQuery) ProtoMessage()    {}
func (*TransformQuery) Descriptor() ([]byte, []int) {
	return fileDescriptor_cb4a498eeb2ba07d, []int{0}
}

func (m *TransformQuery) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_TransformQuery.Unmarshal(m, b)
}
func (m *TransformQuery) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_TransformQuery.Marshal(b, m, deterministic)
}
func (m *TransformQuery) XXX_Merge(src proto.Message) {
	xxx_messageInfo_TransformQuery.Merge(m, src)
}
func (m *TransformQuery) XXX_Size() int {
	return xxx_messageInfo_TransformQuery.Size(m)
}
func (m *TransformQuery) XXX_DiscardUnknown() {
	xxx_messageInfo_TransformQuery.DiscardUnknown(m)
}

var xxx_messageInfo_TransformQuery proto.InternalMessageInfo

func (m *TransformQuery) GetRefId() string {
	if m != nil {
		return m.RefId
	}
	return ""
}

func (m *TransformQuery) GetMaxDataPoints() int64 {
	if m != nil {
		return m.MaxDataPoints
	}
	return 0
}

func (m *TransformQuery) GetIntervalMs() int64 {
	if m != nil {
		return m.IntervalMs
	}
	return 0
}

func (m *TransformQuery) GetModelJson() string {
	if m != nil {
		return m.ModelJson
	}
	return ""
}

type TransformRequest struct {
	TimeRange            *TimeRange        `protobuf:"bytes,1,opt,name=timeRange,proto3" json:"timeRange,omitempty"`
	Queries              []*TransformQuery `protobuf:"bytes,2,rep,name=queries,proto3" json:"queries,omitempty"`
	RequestId            uint32            `protobuf:"varint,3,opt,name=requestId,proto3" json:"requestId,omitempty"`
	XXX_NoUnkeyedLiteral struct{}          `json:"-"`
	XXX_unrecognized     []byte            `json:"-"`
	XXX_sizecache        int32             `json:"-"`
}

func (m *TransformRequest) Reset()         { *m = TransformRequest{} }
func (m *TransformRequest) String() string { return proto.CompactTextString(m) }
func (*TransformRequest) ProtoMessage()    {}
func (*TransformRequest) Descriptor() ([]byte, []int) {
	return fileDescriptor_cb4a498eeb2ba07d, []int{1}
}

func (m *TransformRequest) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_TransformRequest.Unmarshal(m, b)
}
func (m *TransformRequest) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_TransformRequest.Marshal(b, m, deterministic)
}
func (m *TransformRequest) XXX_Merge(src proto.Message) {
	xxx_messageInfo_TransformRequest.Merge(m, src)
}
func (m *TransformRequest) XXX_Size() int {
	return xxx_messageInfo_TransformRequest.Size(m)
}
func (m *TransformRequest) XXX_DiscardUnknown() {
	xxx_messageInfo_TransformRequest.DiscardUnknown(m)
}

var xxx_messageInfo_TransformRequest proto.InternalMessageInfo

func (m *TransformRequest) GetTimeRange() *TimeRange {
	if m != nil {
		return m.TimeRange
	}
	return nil
}

func (m *TransformRequest) GetQueries() []*TransformQuery {
	if m != nil {
		return m.Queries
	}
	return nil
}

func (m *TransformRequest) GetRequestId() uint32 {
	if m != nil {
		return m.RequestId
	}
	return 0
}

type TransformResponse struct {
	Results              []*TransformResult `protobuf:"bytes,1,rep,name=results,proto3" json:"results,omitempty"`
	XXX_NoUnkeyedLiteral struct{}           `json:"-"`
	XXX_unrecognized     []byte             `json:"-"`
	XXX_sizecache        int32              `json:"-"`
}

func (m *TransformResponse) Reset()         { *m = TransformResponse{} }
func (m *TransformResponse) String() string { return proto.CompactTextString(m) }
func (*TransformResponse) ProtoMessage()    {}
func (*TransformResponse) Descriptor() ([]byte, []int) {
	return fileDescriptor_cb4a498eeb2ba07d, []int{2}
}

func (m *TransformResponse) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_TransformResponse.Unmarshal(m, b)
}
func (m *TransformResponse) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_TransformResponse.Marshal(b, m, deterministic)
}
func (m *TransformResponse) XXX_Merge(src proto.Message) {
	xxx_messageInfo_TransformResponse.Merge(m, src)
}
func (m *TransformResponse) XXX_Size() int {
	return xxx_messageInfo_TransformResponse.Size(m)
}
func (m *TransformResponse) XXX_DiscardUnknown() {
	xxx_messageInfo_TransformResponse.DiscardUnknown(m)
}

var xxx_messageInfo_TransformResponse proto.InternalMessageInfo

func (m *TransformResponse) GetResults() []*TransformResult {
	if m != nil {
		return m.Results
	}
	return nil
}

type TransformResult struct {
	Error                string   `protobuf:"bytes,1,opt,name=error,proto3" json:"error,omitempty"`
	RefId                string   `protobuf:"bytes,2,opt,name=refId,proto3" json:"refId,omitempty"`
	MetaJson             string   `protobuf:"bytes,3,opt,name=metaJson,proto3" json:"metaJson,omitempty"`
	Dataframes           [][]byte `protobuf:"bytes,4,rep,name=dataframes,proto3" json:"dataframes,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *TransformResult) Reset()         { *m = TransformResult{} }
func (m *TransformResult) String() string { return proto.CompactTextString(m) }
func (*TransformResult) ProtoMessage()    {}
func (*TransformResult) Descriptor() ([]byte, []int) {
	return fileDescriptor_cb4a498eeb2ba07d, []int{3}
}

func (m *TransformResult) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_TransformResult.Unmarshal(m, b)
}
func (m *TransformResult) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_TransformResult.Marshal(b, m, deterministic)
}
func (m *TransformResult) XXX_Merge(src proto.Message) {
	xxx_messageInfo_TransformResult.Merge(m, src)
}
func (m *TransformResult) XXX_Size() int {
	return xxx_messageInfo_TransformResult.Size(m)
}
func (m *TransformResult) XXX_DiscardUnknown() {
	xxx_messageInfo_TransformResult.DiscardUnknown(m)
}

var xxx_messageInfo_TransformResult proto.InternalMessageInfo

func (m *TransformResult) GetError() string {
	if m != nil {
		return m.Error
	}
	return ""
}

func (m *TransformResult) GetRefId() string {
	if m != nil {
		return m.RefId
	}
	return ""
}

func (m *TransformResult) GetMetaJson() string {
	if m != nil {
		return m.MetaJson
	}
	return ""
}

func (m *TransformResult) GetDataframes() [][]byte {
	if m != nil {
		return m.Dataframes
	}
	return nil
}

type QueryDatasourceRequest struct {
	TimeRange            *TimeRange         `protobuf:"bytes,1,opt,name=timeRange,proto3" json:"timeRange,omitempty"`
	DatasourceId         int64              `protobuf:"varint,2,opt,name=datasourceId,proto3" json:"datasourceId,omitempty"`
	Queries              []*DatasourceQuery `protobuf:"bytes,3,rep,name=queries,proto3" json:"queries,omitempty"`
	OrgId                int64              `protobuf:"varint,4,opt,name=orgId,proto3" json:"orgId,omitempty"`
	XXX_NoUnkeyedLiteral struct{}           `json:"-"`
	XXX_unrecognized     []byte             `json:"-"`
	XXX_sizecache        int32              `json:"-"`
}

func (m *QueryDatasourceRequest) Reset()         { *m = QueryDatasourceRequest{} }
func (m *QueryDatasourceRequest) String() string { return proto.CompactTextString(m) }
func (*QueryDatasourceRequest) ProtoMessage()    {}
func (*QueryDatasourceRequest) Descriptor() ([]byte, []int) {
	return fileDescriptor_cb4a498eeb2ba07d, []int{4}
}

func (m *QueryDatasourceRequest) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_QueryDatasourceRequest.Unmarshal(m, b)
}
func (m *QueryDatasourceRequest) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_QueryDatasourceRequest.Marshal(b, m, deterministic)
}
func (m *QueryDatasourceRequest) XXX_Merge(src proto.Message) {
	xxx_messageInfo_QueryDatasourceRequest.Merge(m, src)
}
func (m *QueryDatasourceRequest) XXX_Size() int {
	return xxx_messageInfo_QueryDatasourceRequest.Size(m)
}
func (m *QueryDatasourceRequest) XXX_DiscardUnknown() {
	xxx_messageInfo_QueryDatasourceRequest.DiscardUnknown(m)
}

var xxx_messageInfo_QueryDatasourceRequest proto.InternalMessageInfo

func (m *QueryDatasourceRequest) GetTimeRange() *TimeRange {
	if m != nil {
		return m.TimeRange
	}
	return nil
}

func (m *QueryDatasourceRequest) GetDatasourceId() int64 {
	if m != nil {
		return m.DatasourceId
	}
	return 0
}

func (m *QueryDatasourceRequest) GetQueries() []*DatasourceQuery {
	if m != nil {
		return m.Queries
	}
	return nil
}

func (m *QueryDatasourceRequest) GetOrgId() int64 {
	if m != nil {
		return m.OrgId
	}
	return 0
}

type QueryDatasourceResponse struct {
	Results              []*DatasourceQueryResult `protobuf:"bytes,1,rep,name=results,proto3" json:"results,omitempty"`
	XXX_NoUnkeyedLiteral struct{}                 `json:"-"`
	XXX_unrecognized     []byte                   `json:"-"`
	XXX_sizecache        int32                    `json:"-"`
}

func (m *QueryDatasourceResponse) Reset()         { *m = QueryDatasourceResponse{} }
func (m *QueryDatasourceResponse) String() string { return proto.CompactTextString(m) }
func (*QueryDatasourceResponse) ProtoMessage()    {}
func (*QueryDatasourceResponse) Descriptor() ([]byte, []int) {
	return fileDescriptor_cb4a498eeb2ba07d, []int{5}
}

func (m *QueryDatasourceResponse) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_QueryDatasourceResponse.Unmarshal(m, b)
}
func (m *QueryDatasourceResponse) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_QueryDatasourceResponse.Marshal(b, m, deterministic)
}
func (m *QueryDatasourceResponse) XXX_Merge(src proto.Message) {
	xxx_messageInfo_QueryDatasourceResponse.Merge(m, src)
}
func (m *QueryDatasourceResponse) XXX_Size() int {
	return xxx_messageInfo_QueryDatasourceResponse.Size(m)
}
func (m *QueryDatasourceResponse) XXX_DiscardUnknown() {
	xxx_messageInfo_QueryDatasourceResponse.DiscardUnknown(m)
}

var xxx_messageInfo_QueryDatasourceResponse proto.InternalMessageInfo

func (m *QueryDatasourceResponse) GetResults() []*DatasourceQueryResult {
	if m != nil {
		return m.Results
	}
	return nil
}

func init() {
	proto.RegisterType((*TransformQuery)(nil), "pluginv2.TransformQuery")
	proto.RegisterType((*TransformRequest)(nil), "pluginv2.TransformRequest")
	proto.RegisterType((*TransformResponse)(nil), "pluginv2.TransformResponse")
	proto.RegisterType((*TransformResult)(nil), "pluginv2.TransformResult")
	proto.RegisterType((*QueryDatasourceRequest)(nil), "pluginv2.QueryDatasourceRequest")
	proto.RegisterType((*QueryDatasourceResponse)(nil), "pluginv2.QueryDatasourceResponse")
}

func init() { proto.RegisterFile("transform.proto", fileDescriptor_cb4a498eeb2ba07d) }

var fileDescriptor_cb4a498eeb2ba07d = []byte{
	// 449 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xa4, 0x93, 0xcf, 0x6e, 0xd3, 0x40,
	0x10, 0xc6, 0xe5, 0x6e, 0x4b, 0x9b, 0x69, 0x4a, 0xca, 0x52, 0x81, 0x31, 0x08, 0x82, 0xc5, 0x21,
	0xa7, 0x48, 0xb8, 0x27, 0x8e, 0x48, 0x91, 0x20, 0x48, 0x48, 0x61, 0x15, 0xc1, 0x79, 0xa9, 0x27,
	0x91, 0xa5, 0xec, 0x6e, 0x3a, 0xbb, 0xae, 0xe8, 0x2b, 0xf0, 0x02, 0xbc, 0x0b, 0x4f, 0x87, 0xbc,
	0xae, 0xff, 0x62, 0xb8, 0xf4, 0x38, 0xdf, 0xce, 0x78, 0xbe, 0xfd, 0x7e, 0x6b, 0x98, 0x38, 0x92,
	0xda, 0x6e, 0x0c, 0xa9, 0xf9, 0x9e, 0x8c, 0x33, 0xfc, 0x64, 0xbf, 0xcb, 0xb7, 0x99, 0xbe, 0x49,
	0xa2, 0xf1, 0x95, 0x51, 0xca, 0xe8, 0x52, 0x8f, 0xce, 0x53, 0xe9, 0xa4, 0x35, 0x39, 0x5d, 0x61,
	0xa9, 0xc4, 0x3f, 0x03, 0x78, 0xb8, 0xae, 0xa6, 0xbf, 0xe4, 0x48, 0xb7, 0xfc, 0x02, 0x8e, 0x08,
	0x37, 0xcb, 0x34, 0x0c, 0xa6, 0xc1, 0x6c, 0x24, 0xca, 0x82, 0xbf, 0x81, 0x33, 0x25, 0x7f, 0x2c,
	0xa4, 0x93, 0x2b, 0x93, 0x69, 0x67, 0xc3, 0x83, 0x69, 0x30, 0x63, 0xa2, 0x2b, 0xf2, 0x97, 0x00,
	0x99, 0x76, 0x48, 0x37, 0x72, 0xf7, 0xd9, 0x86, 0xcc, 0xb7, 0xb4, 0x14, 0xfe, 0x02, 0x46, 0xca,
	0xa4, 0xb8, 0xfb, 0x64, 0x8d, 0x0e, 0x0f, 0xfd, 0xf7, 0x1b, 0x21, 0xfe, 0x15, 0xc0, 0x79, 0x6d,
	0x46, 0xe0, 0x75, 0x8e, 0xd6, 0xf1, 0xb7, 0x30, 0x72, 0x99, 0x42, 0x21, 0xf5, 0x16, 0xbd, 0xa5,
	0xd3, 0xe4, 0xf1, 0xbc, 0xba, 0xdf, 0x7c, 0x5d, 0x1d, 0x89, 0xa6, 0x8b, 0x27, 0x70, 0x7c, 0x9d,
	0x23, 0x65, 0x58, 0xb8, 0x64, 0xb3, 0xd3, 0x24, 0x6c, 0x0d, 0x74, 0x2e, 0x2b, 0xaa, 0xc6, 0xc2,
	0x19, 0x95, 0x1b, 0x97, 0xa9, 0x37, 0x7e, 0x26, 0x1a, 0x21, 0xfe, 0x08, 0x8f, 0x5a, 0xc6, 0xec,
	0xde, 0x68, 0x8b, 0xfc, 0x12, 0x8e, 0x09, 0x6d, 0xbe, 0x73, 0x36, 0x0c, 0xfc, 0x9a, 0x67, 0x03,
	0x6b, 0x84, 0xef, 0x10, 0x55, 0x67, 0x7c, 0x0b, 0x93, 0xde, 0x59, 0x11, 0x38, 0x12, 0x19, 0xaa,
	0x02, 0xf7, 0x45, 0x83, 0xe1, 0xa0, 0x8d, 0x21, 0x82, 0x13, 0x85, 0x4e, 0xfa, 0xfc, 0x98, 0x3f,
	0xa8, 0xeb, 0x22, 0xfc, 0x82, 0xef, 0x86, 0xa4, 0x42, 0x1b, 0x1e, 0x4e, 0xd9, 0x6c, 0x2c, 0x5a,
	0x4a, 0xfc, 0x3b, 0x80, 0x27, 0xfe, 0xd6, 0x8b, 0xfa, 0x15, 0xdc, 0x23, 0xe4, 0x18, 0xc6, 0xcd,
	0x6b, 0xba, 0xb3, 0xc9, 0x44, 0x47, 0x2b, 0x12, 0xaa, 0x40, 0xb0, 0x7e, 0x42, 0x8d, 0x89, 0x1e,
	0x89, 0x0b, 0x38, 0x32, 0xb4, 0x5d, 0xa6, 0xfe, 0x7d, 0x30, 0x51, 0x16, 0xf1, 0x1a, 0x9e, 0xfe,
	0xe5, 0xfd, 0x8e, 0xc3, 0xbb, 0x3e, 0x87, 0x57, 0xff, 0xde, 0xd2, 0xa5, 0x91, 0x7c, 0x6b, 0xd1,
	0x58, 0xf9, 0x19, 0xbe, 0x80, 0x51, 0x2d, 0xf1, 0x68, 0x90, 0xa8, 0xcf, 0x2c, 0x7a, 0x3e, 0x4c,
	0xdb, 0x7b, 0x4a, 0x52, 0x80, 0x0f, 0x24, 0x37, 0x52, 0xcb, 0xf7, 0xab, 0x25, 0xff, 0x0a, 0x93,
	0x9e, 0x79, 0x3e, 0x6d, 0xa6, 0x87, 0x99, 0x44, 0xaf, 0xff, 0xd3, 0x51, 0x6e, 0xf9, 0xfe, 0xc0,
	0xff, 0xc4, 0x97, 0x7f, 0x02, 0x00, 0x00, 0xff, 0xff, 0x62, 0x3f, 0x42, 0xf9, 0x01, 0x04, 0x00,
	0x00,
}

// Reference imports to suppress errors if they are not otherwise used.
var _ context.Context
var _ grpc.ClientConn

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion4

// TransformPluginClient is the client API for TransformPlugin service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://godoc.org/google.golang.org/grpc#ClientConn.NewStream.
type TransformPluginClient interface {
	Transform(ctx context.Context, in *TransformRequest, opts ...grpc.CallOption) (*TransformResponse, error)
}

type transformPluginClient struct {
	cc *grpc.ClientConn
}

func NewTransformPluginClient(cc *grpc.ClientConn) TransformPluginClient {
	return &transformPluginClient{cc}
}

func (c *transformPluginClient) Transform(ctx context.Context, in *TransformRequest, opts ...grpc.CallOption) (*TransformResponse, error) {
	out := new(TransformResponse)
	err := c.cc.Invoke(ctx, "/pluginv2.TransformPlugin/Transform", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// TransformPluginServer is the server API for TransformPlugin service.
type TransformPluginServer interface {
	Transform(context.Context, *TransformRequest) (*TransformResponse, error)
}

// UnimplementedTransformPluginServer can be embedded to have forward compatible implementations.
type UnimplementedTransformPluginServer struct {
}

func (*UnimplementedTransformPluginServer) Transform(ctx context.Context, req *TransformRequest) (*TransformResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Transform not implemented")
}

func RegisterTransformPluginServer(s *grpc.Server, srv TransformPluginServer) {
	s.RegisterService(&_TransformPlugin_serviceDesc, srv)
}

func _TransformPlugin_Transform_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(TransformRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(TransformPluginServer).Transform(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/pluginv2.TransformPlugin/Transform",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(TransformPluginServer).Transform(ctx, req.(*TransformRequest))
	}
	return interceptor(ctx, in, info, handler)
}

var _TransformPlugin_serviceDesc = grpc.ServiceDesc{
	ServiceName: "pluginv2.TransformPlugin",
	HandlerType: (*TransformPluginServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "Transform",
			Handler:    _TransformPlugin_Transform_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "transform.proto",
}

// GrafanaAPIClient is the client API for GrafanaAPI service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://godoc.org/google.golang.org/grpc#ClientConn.NewStream.
type GrafanaAPIClient interface {
	QueryDatasource(ctx context.Context, in *QueryDatasourceRequest, opts ...grpc.CallOption) (*QueryDatasourceResponse, error)
}

type grafanaAPIClient struct {
	cc *grpc.ClientConn
}

func NewGrafanaAPIClient(cc *grpc.ClientConn) GrafanaAPIClient {
	return &grafanaAPIClient{cc}
}

func (c *grafanaAPIClient) QueryDatasource(ctx context.Context, in *QueryDatasourceRequest, opts ...grpc.CallOption) (*QueryDatasourceResponse, error) {
	out := new(QueryDatasourceResponse)
	err := c.cc.Invoke(ctx, "/pluginv2.GrafanaAPI/QueryDatasource", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// GrafanaAPIServer is the server API for GrafanaAPI service.
type GrafanaAPIServer interface {
	QueryDatasource(context.Context, *QueryDatasourceRequest) (*QueryDatasourceResponse, error)
}

// UnimplementedGrafanaAPIServer can be embedded to have forward compatible implementations.
type UnimplementedGrafanaAPIServer struct {
}

func (*UnimplementedGrafanaAPIServer) QueryDatasource(ctx context.Context, req *QueryDatasourceRequest) (*QueryDatasourceResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method QueryDatasource not implemented")
}

func RegisterGrafanaAPIServer(s *grpc.Server, srv GrafanaAPIServer) {
	s.RegisterService(&_GrafanaAPI_serviceDesc, srv)
}

func _GrafanaAPI_QueryDatasource_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(QueryDatasourceRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(GrafanaAPIServer).QueryDatasource(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/pluginv2.GrafanaAPI/QueryDatasource",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(GrafanaAPIServer).QueryDatasource(ctx, req.(*QueryDatasourceRequest))
	}
	return interceptor(ctx, in, info, handler)
}

var _GrafanaAPI_serviceDesc = grpc.ServiceDesc{
	ServiceName: "pluginv2.GrafanaAPI",
	HandlerType: (*GrafanaAPIServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "QueryDatasource",
			Handler:    _GrafanaAPI_QueryDatasource_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "transform.proto",
}
